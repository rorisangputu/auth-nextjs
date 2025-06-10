import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const user = session.user;
  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium">{user?.name || user?.email}</p>
        {user?.image && 
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user?.image as string} alt={user?.name as string} 
            className="h-32 w-32 m-5 rounded-full"
          />}
      </div>

      <SignOut />
    </>
  );
};

export default Page;
