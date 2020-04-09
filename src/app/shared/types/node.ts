export interface Fs {
  readdir: (
    path: string,
    callback: (err: Error, files: string) => void
  ) => void;
  mkdir: (path: string, callback: (err: any) => void) => void;
  access: (path: string, callback: (err: any) => void) => void;
  writeFile: (file: string, data: string, callback: (err: any) => void) => void;
  readFile: (
    path: string,
    encoding: string,
    callback: (err: any, data: any) => void
  ) => void;
}
