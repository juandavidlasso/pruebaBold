import { NextPage } from 'next';
import axios from 'axios';
import Header from '@/components/header';
import { DashboardState } from '@/models/dashboard';
import Dashboard from '@/views/dashboard';
import { ThemeProps } from '@/models/theme';

interface Props {
    data: {
        data: DashboardState[];
    };
    toogleTheme: (theme: ThemeProps) => void;
}

const Home: NextPage<Props> = ({ data, toogleTheme }) => {
    return (
        <div className={`!bg-[#F3F3F3] dark:!bg-[#121212]`}>
            <Header toogleTheme={toogleTheme} />
            <Dashboard data={data.data} />
        </div>
    );
};

export async function getStaticProps() {
    const data = await axios.get('https://bold-fe-api.vercel.app/api');
    return {
        props: {
            data: data.data
        }
    };
}

export default Home;
