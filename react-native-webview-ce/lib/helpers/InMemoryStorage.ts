// Source: github.com/authts/oidc-client-ts/blob/74bb5b5cc0bd30170ca02d42c209435acf90a380/src/InMemoryWebStorage.ts

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

export class InMemoryStorage implements Storage {
  private _data: Record<string, string> = {};

  public clear(): void {
    this._data = {};
  }

  public getItem(key: string): string {
    const item = this._data[key];
    return item ?? null;
  }

  public setItem(key: string, value: string): void {
    this._data[key] = value;
  }

  public removeItem(key: string): void {
    delete this._data[key];
  }

  public get length(): number {
    return Object.getOwnPropertyNames(this._data).length;
  }

  public key(index: number): string {
    return Object.getOwnPropertyNames(this._data)[index];
  }
}
