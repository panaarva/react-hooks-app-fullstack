import React, {useEffect, useState} from "react";
import MaterialTable from 'material-table'
import {forwardRef} from 'react';
import axios from 'axios';
import {encode} from '../utils/utils';
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
        margin: theme.spacing(8, 0, 15)
    }
}));
export default function (props) {
    const {data, fetchData, stringValues} = props
    const classes = useStyles();
    const [alert, setAlert] = useState({
        severity: "success",
        message: "Sign In Success!!",
        openAlert: false
    })
    const [columns, setColumns] = useState([
        {id: "username", title: stringValues.username, field: 'username'},
        {title: stringValues.password, field: 'userpassword', type: 'string'},
        {title: stringValues.email, field: 'email'},
        {title: stringValues.birthDay, field: 'bornday', type: 'date'},
        {
            title: stringValues.gender,
            field: 'gender',
            lookup: {male: 'male', female: 'female', other: 'other'},
        },
    ]);
        const updateData = (token, userId) => {
                    axios.put(`/user?userId=${userId}`, {token}).then(() => {
            setAlert({...alert, openAlert: true, message: stringValues.updateSuc,severity: "success"})
            fetchData()
        }).catch((err) => {
            setAlert({...alert, openAlert: true, message: stringValues.notUpdateSuc,severity: "error"})
            console.error(err);
        })
    }
    const deleteData = (userId) => {
        axios.delete(`/user?userId=${userId}`).then(() => {
            setAlert({...alert, openAlert: true, message: stringValues.deletedSuc,severity: "success"})
            fetchData();
        }).catch((err)=>{
            setAlert({...alert, openAlert: true, message: stringValues.notDeletedSuc,severity: "success"})
            console.error(err)
        })
    }
    useEffect(() => {
        setColumns([
            {id: "username", title: stringValues.username, field: 'username'},
            {title: stringValues.password, field: 'userpassword', type: 'string'},
            {title: stringValues.email, field: 'email'},
            {title: stringValues.birthDay, field: 'bornday', type: 'date'},
            {
                title: stringValues.gender,
                field: 'gender',
                lookup: {male: stringValues.male, female: stringValues.female, other: stringValues.other},
            },
        ])
    }, [stringValues])
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <MaterialTable
                icons={tableIcons}
                title={stringValues.userInfo}
                columns={columns}
                data={data}
                localization={{
                    body: {
                        emptyDataSourceMessage: stringValues.displayUser,
                        deleteTooltip: stringValues.deleted,
                        editTooltip: stringValues.edit,
                        editRow: {
                            deleteText: stringValues.deleteMsg,
                            cancelTooltip: stringValues.cancel,
                            saveTooltip: stringValues.save
                        }
                    },
                    header: {
                        actions: stringValues.actions
                    },
                    pagination: {
                        labelDisplayedRows: `{from}-{to} ${stringValues.of} {count}`,
                        labelRowsSelect: stringValues.rows,
                        firstAriaLabel: stringValues.firstPage,
                        firstTooltip: stringValues.firstPage,
                        previousAriaLabel: stringValues.previousPage,
                        previousTooltip: stringValues.previousPage,
                        nextAriaLabel: stringValues.nextPage,
                        nextTooltip: stringValues.nextPage,
                        lastAriaLabel: stringValues.lastPage,
                        lastTooltip: stringValues.lastPage
                    },
                    toolbar: {
                        exportTitle: stringValues.export,
                        searchTooltip: stringValues.search,
                        searchPlaceholder: stringValues.search
                    }
                }}
                options={{exportButton: true}}
                editable={{
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                const token = encode(newData);
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
