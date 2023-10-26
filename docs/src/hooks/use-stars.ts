import useSWR from 'swr/immutable';

export const useStars = () => {
    const {data} = useSWR<{
        stargazers_count: number
    }>(
        'https://api.github.com/repos/AprilNEA/next-online-judge',
        (url: string) => fetch(url).then(res => res.json()))
    return data?.stargazers_count;
};