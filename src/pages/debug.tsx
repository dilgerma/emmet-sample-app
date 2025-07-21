import DebugComponent from '../screens/debug/DebugComponent';
import {Navigation} from "../components/navigation/Navigation";
import {commonGetServerSideProps} from "../supabase/ProtectedPageProps";
import {GetServerSidePropsContext} from "next";


export default function Debug(props: any) {
        return <DebugComponent/>
}

export const getServerSideProps = async (context: GetServerSidePropsContext):Promise<any> => {
    return commonGetServerSideProps(context)}