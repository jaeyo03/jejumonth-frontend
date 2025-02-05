import PropTypes from 'prop-types';

const FollowingTap = ({ followingData, unfollowUserHandler }) => {
  return (
    <>
      {followingData?.length > 0 ? (
        followingData.map((followingData, index) => (
          <div className="w-full" key={index}>
            <div className="flex items-center justify-between mt-28">
              <img
                src={(followingData.image && followingData.image) || `/images/dummy-user-img.png`}
                alt="더미이미지입니다."
                className="rounded-[50%] w-36 h-36"
              />

              <div className="grow-[2] pl-16">
                <p className="text-12">{followingData.fullName}</p>
              </div>

              <div
                className="bg-white border-sub-accent-2 border border-solid px-10 py-6 rounded-12 text-12 cursor-pointer text-sub-accent-2"
                onClick={() => unfollowUserHandler(followingData._id)}
              >
                팔로우 취소
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <img src="/images/harbang.png" alt="한라봉 이미지" className="my-20" />
          <p className="text-center text-gray-6">아직 팔로잉이 없습니다!</p>
        </div>
      )}
    </>
  );
};

export default FollowingTap;

FollowingTap.propTypes = {
  followingData: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      fullName: PropTypes.string,
      _id: PropTypes.string,
    }),
  ),
  unfollowUserHandler: PropTypes.func,
};
