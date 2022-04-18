import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UtilsService {
    async hashPassword(password: string): Promise<string> {
        const saltOrRound = 10
        return await bcrypt.hash(password, saltOrRound)
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}
