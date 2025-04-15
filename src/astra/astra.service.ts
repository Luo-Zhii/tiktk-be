import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataAPIClient, Collection } from '@datastax/astra-db-ts';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AstraService implements OnModuleInit {
  private client = new DataAPIClient(process.env.ASTRA_DB_TOKEN!);
  private db;

  async onModuleInit() {
    this.db = this.client.db(process.env.ASTRA_DB_ENDPOINT!, {
      keyspace: process.env.ASTRA_DB_KEYSPACE!,
    });

    const collections = await this.db.listCollections();
    console.log('✅ Connected to AstraDB. Available collections:', collections);

    // Tạo collection nếu chưa có
    await this.createCollection('user_behavior');
  }

  // Tạo collection nếu chưa có
  async createCollection(name: string) {
    const collections = await this.db.listCollections();
    const exists = collections.some((col: any) => col.name === name);

    if (!exists) {
      await this.db.createCollection(name);
      console.log(`📦 Collection "${name}" created successfully.`);
    } else {
      console.log(`⚠️ Collection "${name}" already exists.`);
    }
  }

  // Lấy danh sách collection
  async listCollections() {
    return this.db.listCollections();
  }

  // Truy xuất collection cụ thể
  async getCollection(name: string): Promise<Collection<any>> {
    return this.db.collection(name);
  }

  // Ghi log tracking chuột
  async insertLog(collectionName: string, log: any) {
    const collection = await this.getCollection(collectionName);
    const result = await collection.insertMany(log);
    console.log('📝 Log inserted:', result);
    return result;
  }
}
