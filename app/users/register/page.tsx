import dynamic from "next/dynamic";
import UserFormSkeleton from './loading';

const UserForm = dynamic(() => import("@/app/users/register/_components/UserForm"), {
  ssr: false,
  loading: () => <UserFormSkeleton />,
});

const NewIssuePage = () => {
  return <UserForm />;
};

export default NewIssuePage;
