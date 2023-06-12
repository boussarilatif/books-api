import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Language {
  ENGLISH = 'English',
  FRENCH = 'French',
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column({ type: 'date',nullable: true })
  publicationDate: string;

  @Column({nullable: true})
  numberOfPages: number;

  @Column({ type: 'enum', enum: Language,nullable: true })
  language: Language;
}
