import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  if(session){
    switch (session.user.roleID) {
      case 1:
        router.push("/admin/manage-career-center-staff");
        break;
      case 2:
        router.push("/student/internship-applications");
        break;
      case 3:
        router.push("/instructor/completed-internship-applications");
        break;
      case 4:
        router.push("/career-center/completed-internship-applications");
        break;
      case 5:
        return false;
      default:
        break;
    }
  }else{
    
  }
  

  return <></>;
}
