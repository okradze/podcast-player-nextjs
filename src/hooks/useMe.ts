import { useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'

const useMe = () => useSelector((state: RootState) => state.auth.me)

export default useMe
