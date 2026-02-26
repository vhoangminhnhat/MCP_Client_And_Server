import { SignUpDto } from "@/auth/dto/signUp.dto";
import { User } from "../entity/user.entity";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  checkExisted(userInfo: SignUpDto): Promise<User | null>;
}