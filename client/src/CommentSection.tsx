import { Comment } from '../types/common';

interface CommentSectionProps {
  comments: Comment[];
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="comment-section">
      <h4>Comments ({comments.length})</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="comment-header">
            <span>Teacher ID: {comment.teacherId}</span>
            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <p>{comment.message}</p>
        </div>
      ))}
    </div>
  );
}