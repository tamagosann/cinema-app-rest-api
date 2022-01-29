import { User } from 'src/user/entity/user.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FilmReview {
  @PrimaryGeneratedColumn()
  filmReviewId: number;

  // 初期値を入れる場合は、defaultに入れる
  // @Column({default: false})
  @Column()
  star: number;

  @Column()
  reviewDate: number;

  @Column()
  reviewTitle: string;

  @Column()
  reviewOverview: string;

  @ManyToOne(() => User, (user) => user.filmReviews)
  user: User;

  // こいつらは一旦インスタンスを作成してからsaveしないと発動しない
  @AfterInsert()
  logInsert() {
    console.log('Inserted FilmReview with Id', this.filmReviewId);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated FilmReview with id', this.filmReviewId);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed FilmReview with id', this.filmReviewId);
  }
}
