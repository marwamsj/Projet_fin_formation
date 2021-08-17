import React, {useEffect}  from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { getNeeds } from '../../JS/Actions/patientNeeds';
import Loading from '../../utils/loading/Loading';
import NeedCart from './NeedCart';
import CreateNeeds from './CreateNeeds';
import "./Forum.css";

function Forum() {
    const dispatch = useDispatch();
    const Needs = useSelector(state => state.patientNeeds.needs);
    const loadNeeds = useSelector(state => state.patientNeeds.loadNeeds);

    useEffect(() => {
       dispatch(getNeeds())
    }, [])
    return (
        <div className="needs" >
            {loadNeeds? (
                <Loading/>):(
                    <div>
                    <CreateNeeds/>
                    {Needs.map(el=>
                    <NeedCart key={el._id} need={el}/>)}
                    </div>
                    )}
            
        </div>
    )
}

export default Forum
