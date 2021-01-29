import * as bcrypt from 'bcrypt';

export async function genHashPassword(password: string, rounds: number = 10): Promise<string> {
  const saltOrRounds = await bcrypt.genSalt(rounds);
  const hashPassword = await bcrypt.hash(password, saltOrRounds);

  return hashPassword;
};