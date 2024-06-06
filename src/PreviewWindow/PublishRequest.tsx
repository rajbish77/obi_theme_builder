import React, { useEffect, useState } from 'react'
// import DataTable, { TableColumn } from 'react-data-table-component';
import { Button, Card, CardBody, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { showConfirm, showError, showReject, showSuccess } from '../components/Swal';
import { getPublishRequests, updateTheme } from '../apicalls';
import { HandleAPIError } from '../commonFunction';
import Loader from '../Loader';
import { PREVIEW_URL } from '../commonConstant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import { createColumnHelper } from '@tanstack/react-table';
import { CustomTable } from '../components/CommonComponent/Table';

interface DataRow {
  affiliateid: number;
  distributorname: string;
  name: string;
  entryby: string;
  entrydate: string;
}

function PublisherListing(): JSX.Element {

  const columnHelper = createColumnHelper();
  const COLUMNS = [
    columnHelper.accessor("distributorname", {
      cell: (info) => (
        <div style={{ textAlign: "left" }}>
          {info.getValue()}
        </div>
      ),
      header: "Distributor Name",
    }),
    columnHelper.accessor("name", {
      cell: (info) => (
        <div style={{ textAlign: "left" }}>{info.getValue()}</div>
      ),
      header: "Name",
    }),
    columnHelper.accessor("entryby", {
      cell: (info) => (
        <div style={{ textAlign: "left" }}>{info.getValue()}</div>
      ),
      header: "Entry by",
    }),
    columnHelper.accessor("entrydate", {
      cell: (info) => (
        <div style={{ textAlign: "left" }}>{info.getValue()}</div>
      ),
      header: "Entry Date",
    }),
    columnHelper.accessor("view", {
      cell: (info) => (
        <div style={{ textAlign: "center" }}>

          <Button
            onClick={() => handlePreviewButtonClick(info.row.original)}
            size='sm'
            className='custom-class'
          >
            Preview
          </Button>
          <Button
            onClick={() => handlePublishButtonClick(info.row.original)}
            size='sm'
            className='custom-class btn-success'
          >
            Publish
          </Button>
          <Button
            onClick={() => handleRejectButtonClick(info.row.original)}
            size='sm'
            className='custom-class btn-danger'
          >
            Reject
          </Button>
        </div>
      ),
      header: "",
      enableSorting: false,
    }),
  ];

  const [publishRequests, setPublishRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tmp, settmp] = useState(0);

  const handlePreviewButtonClick = (row: any) => {
    window.open(`${PREVIEW_URL}affiliate/${row?.affiliateid}?preview=true`, "_blank");
  }

  const handlePublishButtonClick = async (row: any) => {
    let confirmed = await showConfirm("Confirm", "Are you sure, want to publish the theme?");
    if (confirmed.isConfirmed) {
      try {
        setLoading(true);
        const request = {
          "affiliateid": row?.affiliateid,
          "action": "P"
        }
        const response = await updateTheme(request);
        if (response?.status === 0) {
          showSuccess("Success", "Theme published successfully");
        } else {
          showError("Error", response?.statusMessage);
        }
      } catch (error) {
        HandleAPIError(error);
      } finally {
        setLoading(false);
        settmp(tmp + 1);
      }
    }
  }

  const handleRejectButtonClick = async (row: any) => {
    let confirmed = await showReject("Remarks", row?.entryby, row.distributorname);
    if (confirmed.isConfirmed) {
      try {
        setLoading(true);
        const request = {
          "affiliateid": row?.affiliateid,
          "action": "R",
          "message": confirmed?.value
        }
        const response = await updateTheme(request);
        if (response?.status === 0) {
          showSuccess("Success", "Publish request rejected!");
        } else {
          showError("Error", response?.statusMessage);
        }
      } catch (error) {
        HandleAPIError(error);
      } finally {
        setLoading(false);
        settmp(tmp + 1);
      }
    }
  }

  const getPublishRequest = async () => {
    try {
      setLoading(true);
      const response = await getPublishRequests();
      if (response?.status === 0) {
        setPublishRequests(response?.data?.themes);
      } else {
        showError("Error", response?.statusMessage);
      }
    } catch (error) {
      HandleAPIError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPublishRequest();
  }, [tmp])

  return (
    <>
      <Loader loading={loading} />
      <Container className='py-3 h-100'>
        <h3 className='text-center py-2 text-black my-4 underline'><u>Publish Request</u></h3>
        <Card className='shadow mt-4'>
          <CardBody className='p-4'>
            {/* <DataTable columns={columns} data={publishRequests} pagination striped /> */}
            <CustomTable
              columns={COLUMNS}
              data={publishRequests}
              noDataMessage={"No Data Available"}
            />
          </CardBody>
        </Card>
      </Container>
    </>

  );
}

export default PublisherListing;