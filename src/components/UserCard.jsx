const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img className="aspect-5/4 w-full" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <label className="inline">
          {age} {gender}
        </label>
        <p>{about}</p>
        <div className="card-actions justify-center gap-4 my-4">
          <button className="btn btn-primary">ignore</button>
          <button className="btn btn-secondary">send request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
