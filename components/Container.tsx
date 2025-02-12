import { SafeAreaView } from 'react-native';

export const Container = ({ children, className }: { children: React.ReactNode, className:string }) => {
  return <SafeAreaView className={styles.container}>{children}</SafeAreaView>;
};

const styles = {
  container: 'flex flex-1 m-6',
};
