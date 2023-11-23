// "use client";
// import { currentUser } from '@clerk/nextjs';
// import { useRouter } from "next/navigation";

// export default async function CustomerId() {
//   const router = useRouter();
//   const user = await currentUser();

//   if (!isLoaded) {
//     return "";
//   }
//   if (!isSignedIn) {
//     router.push("/sign-in");
//     return "";
//   }
//   return {
//     user: user.id,
//   };
// }
