import { Column } from "typeorm";

export class Writer {
  @Column({name: 'writer_id'})
  private id: string;

  @Column({name: 'writer_name'})
  private name: string;

  @Column({name: 'writer_email'})
  private email: string;
}