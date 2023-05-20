import axios from "axios";
import { GET_SEARCH_DATA, SEARCH } from "../actionTypes";
import { setLoading } from "./global";

const url = process.env.REACT_APP_BASE_URL;

//-----------------------------------------
export const getSearchData = (dispatch) => {
    console.log(url);
    axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/hotels/search`,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            dispatch({
                type: GET_SEARCH_DATA,
                payload: response.data.data
            });
        })
        .catch((error) => {});
};

//-----------------------------------------
export const search = (dispatch, criteria, page = 1) => {
 console.log(url);
    setLoading(dispatch, true);
    axios({
        method: "post",
        url: `http://127.0.0.1:8000/api/hotels/search?page=${page}`,
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            check_in: criteria.check_in,
            check_out: criteria.check_out,
            city: criteria.city,
            star: criteria.star,
            guest: criteria.guest,
            min_price: criteria.min_price,
            max_price: criteria.max_price,
            features: criteria.features
        }
    })
        .then((response) => {
            dispatch({
                type: SEARCH,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
        });
};
