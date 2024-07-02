import React from 'react';
import style from './GetComments.module.css';

export default function GetComments({ comments }) {
  return (
    <div>
      {comments.map(comment => (
        <div className={style.container} key={comment.chatid}>
          <div className={style.top}>
            <div className={style.id}>
              No. {comment.chatid}
            </div>
            <div className={style.date}>
              {comment.chatdate}
            </div>
          </div>
          <div className={style.comment}>
            {comment.chatcomment}
          </div>
        </div>
      ))}
    </div>
  );
}