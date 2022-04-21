import { useFetch } from "../hooks/useFetch";

export default function UserDetail() {

    interface User {
        id: string,
        name: {
            title: string,
            first: string,
            last: string
        };
        gender: string;
        email: string;
        location: {
            x: Number,
            y: Number,
            z: Number,
        };
        picture: {
            thumbnail: string
        }
    }

    const { data: userData, isFetching } =
        useFetch<User[]>(``);
    return (
        <>
            {isFetching && <p>Loading...</p>}

            {userData?.map((user) => {
                return (
                    <div>
                        <img src={user.picture.thumbnail} alt="" srcset="" />
                        <span key={user.email}>{user.name.title}</span>
                        <span>{user.name.first}</span>
                        <span>{user.gender}</span>
                        <span>{user.email}</span>
                    </div>
                );
            })}
        </>
    )
}