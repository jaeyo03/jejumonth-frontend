import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '../../../../../apis/getUserData';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import { commentDeleteApi } from '../../../../../apis/commentCreateApi';
import MyPageHeader from '../common/myPageHeader';

const CommentSection = () => {
  const { userId } = useSelector(state => state.user);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userData', userId],
    queryFn: async () => await getUserData(userId),
  });

  const { mutate } = useMutation({
    mutationFn: commentDeleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData', userId] });
    },
    onError: error => {
      console.error('삭제 실패:', error);
    },
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 데 실패했습니다.</p>;
  return (
    <>
      <article className="w-full">
        <MyPageHeader title={'작성한 게시글'}></MyPageHeader>

        <div className="mt-24">
          {data?.comments?.length === 0 && (
            <div className="flex justify-center items-center w-full p-10 mt-16 border border-gray-6 border-dashed min-h-80px">
              <p className="text-gray-7">아직 작성한 댓글이 없습니다!</p>
            </div>
          )}
          {data?.comments &&
            data.comments.map((comment, index) => (
              <Comment
                key={index}
                commentData={comment}
                deleteEvent={() => mutate(comment._id)}
              ></Comment>
            ))}
        </div>
      </article>
    </>
  );
};

export default CommentSection;
