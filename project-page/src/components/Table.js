import React, {useState} from "react";
import MaterialTable from 'material-table'
import {forwardRef} from 'react';
import axios from 'axios';
import {incode} from '../utils/utils';
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    ViewColumn,
    Search,
    SaveAlt,
    Remove,
    LastPage,
    FirstPage,
    FilterList,
    Edit,
    DeleteOutline
} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";
import Alert from "./Alert";
import {CssBaseline} from "@material-ui/core";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(8, 0, 0),
    }
}));
export default function (props) {
    const {data, fetchData} = props
    const classes = useStyles();
    const [alert, setAlert] = useState({
        severity: "success",
        message: "Sign In Success!!",
        openAlert: false
    })
    const [columns] = useState([
        {id: "username", title: 'User Name', field: 'username'},
        {title: 'Password', field: 'userpassword', type: 'string'},
        {title: 'Email', field: 'email'},
        {title: 'Birth Day', field: 'bornday', type: 'date'},
        {
            title: 'Gender',
            field: 'gender',
            lookup: {male: 'male', female: 'female', other: 'other'},
        },
    ]);
    const updateData = (token, userId) => {
        axios.put(`http://localhost:9000/user?userId=${userId}`, {token}).then(() => {
            setAlert({...alert, openAlert: true, message: 'Update Success!!'})
            fetchData()
        }).catch((err) => {
            console.error(err);
        })
    }
    const deleteData = (userId) => {
        axios.delete(`http://localhost:9000/user?userId=${userId}`).then(() => {
            fetchData();
        })
    }
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <MaterialTable
                icons={tableIcons}
                title="Users Information"
                columns={columns}
                data={data}
                options={{exportButton: true}}
                editable={{
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                const token = incode(newData);
                                updateData(token, newData.id);
                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                deleteData(data[oldData.tableData.id].id);
                                resolve()
                            }, 1000)
                        }),
                }}
            />
            <Alert alert={alert} setAlert={setAlert}/>
        </div>
    )
}
