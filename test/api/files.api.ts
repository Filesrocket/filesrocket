import { createWriteStream } from "fs";
import { resolve } from "path";
import express from "express";

import {
  FileEntity,
  ResultEntity,
  ServiceMethods,
  UploadOptions
} from "../../src";
import { FileController } from "../../src/controllers/file.controller";
import { handler } from "../utils/common";

const _app = express();

export const items: Partial<ResultEntity>[] = [
  { id: "1", name: "filesrocket.png", size: 12345 },
  { id: "2", name: "filesrocket-local.png", size: 54321 },
  { id: "3", name: "filesrocket-client.png", size: 52413 }
];

class Service implements Partial<ServiceMethods> {
  async create(data: FileEntity): Promise<Partial<ResultEntity>> {
    const writable = createWriteStream(resolve(`uploads/${data.name}`));
    data.stream.pipe(writable);
    return { name: data.name };
  }

  async list(): Promise<Partial<ResultEntity>[]> {
    return items;
  }

  async remove(id: string): Promise<Partial<ResultEntity>> {
    const index: number = items.findIndex(item => item.id === id);

    const data = items[index];
    items.splice(index, 1);

    return data;
  }
}

const controller = new FileController(new Service());
const PATH: string = "/files";

const options: Partial<UploadOptions> = {
  allowedExts: [".png"]
};

_app.post(PATH, controller.create(options), handler);
_app.get(PATH, controller.list(), handler);
_app.delete(PATH, controller.remove(), handler);

export const app = _app;
export const path = PATH;
