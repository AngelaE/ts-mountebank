import request = require('superagent');
import { Imposter } from './imposter';

export class Mountebank {
  private adminUrl: string;

  constructor(mountebankUrl = 'localhost', public logErrorResults = false) {
    this.adminUrl = `http://${mountebankUrl}:2525`;
  }

  public async checkIsAlive(logIfNotAlive = false): Promise<boolean> {
    const url = `${this.adminUrl}/`;
    const result = await request.get(url);
    if (result.statusCode == 200) return true;

    if (logIfNotAlive) {
      console.log(`Mountebank is not available under url '${url}'`);
      console.log(result);
    }
    return false;
  }

  public async createImposter(imposter: Imposter): Promise<void> {
    try {
      // just try to delete in case an imposter is there
      await this.deleteImposter(imposter.port);
    } catch (error) {} // eslint-disable-line

    const response = await request
      .post(`${this.adminUrl}/imposters`)
      .send(JSON.stringify(imposter));

    if (response.statusCode != 201)
      throw new Error(
        `Problem creating imposter: ${JSON.stringify(response?.error)}`
      );
  }

  public async deleteImposter(port: number): Promise<void> {
    await request.delete(`${this.adminUrl}/imposters/${port}`);
  }

  public async getImposter(port: number): Promise<Imposter> {
    const response = await request.get(`${this.adminUrl}/imposters/${port}`).accept('application/json');
    return response.body;
  }
}
