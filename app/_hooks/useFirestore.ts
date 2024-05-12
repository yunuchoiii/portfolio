import { DocumentData, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import fireStore from '../_commons/libraries/firestore';

function useFirestore(collectionName: string) {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(fireStore, collectionName));
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(documents);
      } catch (err) {
        setError(err as Error);
        location.reload();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
}

export default useFirestore;
