import { LandingContainer } from "@/modules/Landing/containers/LandingContainer";
import NextHead from "@/shared/components/NextHead";

export default function Home() {
  return (
    <>
      <NextHead title="Super-Teacher" />
      <LandingContainer />
    </>
  );
}
