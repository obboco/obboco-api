import { RequestRepository } from "./requestRespository";
import { readFileSync, readdirSync, statSync } from "fs";

export class RequestParser {
  protected path: string;
  protected requestRepository: RequestRepository;

  constructor(path: string, requestRepository: RequestRepository) {
    this.path = path;
    this.requestRepository = requestRepository;
  }

  execute(): void {
    try {
      const addFileIntoRepository = (filePath: string): void => {
        try {
          this.requestRepository.put(
            JSON.parse(readFileSync(filePath, "utf-8"))
          );
        } catch {
          return null;
        }
      };
      const parseFiles = (path: string) => {
        readdirSync(path).forEach((file: string): void => {
          const filePath = path + "/" + file;
          if (statSync(filePath).isDirectory()) {
            parseFiles(filePath);
          } else {
            addFileIntoRepository(filePath);
          }
        });
      };
      parseFiles(this.path);
    } catch (err) {
      console.error(err);
    }
  }
}
