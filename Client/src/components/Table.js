import React, {useEffect, useState, forwardRef} from "react";
import MaterialTable from 'material-table';
import {useHistory} from 'react-router-dom';
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
    DeleteOutline,
    Person as PersonIcon
} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";
import Alert from "./Alert";
import {CssBaseline} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

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
        marginTop: theme.spacing(8),
        paddingBottom: theme.spacing(25)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
export default function (props) {
    const [open, setOpen] = useState(false);
    const divProps = Object.assign({}, props);
    delete divProps.layout;

    const history = useHistory();
    const {data, fetchData, stringValues, flag} = props
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
    const updateData = async (token, userId) => {
        try {
            await axios.put(`/user?userId=${userId}`, {token});
            setAlert({...alert, openAlert: true, message: stringValues.updateSuc, severity: "success"});
            await fetchData();
        } catch (err) {
            setAlert({...alert, openAlert: true, message: stringValues.notUpdateSuc, severity: "error"});
            console.error(err);
        }
    }
    const deleteData = async (userId) => {
        try {
            await axios.delete(`/user?userId=${userId}`);
            setAlert({...alert, openAlert: true, message: stringValues.deletedSuc, severity: "success"});
            await fetchData();
        } catch (err) {
            setAlert({...alert, openAlert: true, message: stringValues.notDeletedSuc, severity: "success"});
            console.error(err);
        }
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
            <div>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </div>
            <MaterialTable
                icons={tableIcons}
                title={stringValues.userInfo}
                columns={columns}
                data={data}
                components={{
                    OverlayLoading: () => (<div/>)
                }}
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
                actions={[
                    {
                        icon: PersonIcon,
                        tooltip: stringValues.profile,
                        onClick: (event, rowData) => {
                            const {id} = rowData;
                            history.push(`/${flag}/profile/${id}`)
                        }
                    }
                ]}
                editable={{
                    onRowUpdate: async(newData) => {
                        setOpen(true);
                        const token = encode(newData);
                        await updateData(token, newData.id);
                        setOpen(false);
                    },
                    onRowDelete:async (oldData) => {
                        setOpen(true);
                        await deleteData(data[oldData.tableData.id].id);
                        setOpen(false);
                    }
                }}
            />
            <Alert alert={alert} setAlert={setAlert}/>
        </div>
    )
}
