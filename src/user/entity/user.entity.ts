import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FilmReview } from 'src/film/entity/filmReview.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @Column()
  icon: string;

  @Column()
  iconColor: string;

  @OneToMany(() => FilmReview, (filmReview) => filmReview.user)
  filmReviews: FilmReview[];

  // こいつらは一旦インスタンスを作成してからsaveしないと発動しない
  @AfterInsert()
  logInsert() {
    console.log('Inserted user with userId', this.userId);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.userId);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.userId);
  }
}
