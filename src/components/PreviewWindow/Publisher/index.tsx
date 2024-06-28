import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Container } from "react-bootstrap";
import { createColumnHelper } from '@tanstack/react-table';
import { CustomTable } from '../../CommonComponent/Table';
import Loader from '../../../Loader';
import { PREVIEW_URL, VIPER_CONST } from '../../../commonConstant';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { publish } from '../../../slices/publisher/publisherSlice';
import { showConfirm, showError, showReject, showSuccess } from '../../Swal';
import { updateTheme } from '../../../apicalls';
import { HandleAPIError } from '../../../commonFunction';

function PublisherListing(): JSX.Element {
  const dispatch = useAppDispatch();
  const getPublisher = useAppSelector((state) => state.publish.publisher);
  const [tmp, setTmp] = useState(0);
  const [loading,setLoading] = useState(false);

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

  const handlePreviewButtonClick = (row: any) => {
    window.open(`${PREVIEW_URL}affiliate/${row?.affiliateid}?preview=true`, "_blank");
  }

  const handlePublishButtonClick = async (row: any) => {
    let confirmed = await showConfirm("Confirm", "Are you sure you want to publish the theme?");
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
        setTmp(tmp + 1);
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
        setTmp(tmp + 1);
      }
    }
  }

  useEffect(() => {
    dispatch(publish());
  }, [dispatch, tmp]);

  useEffect(() => {
    console.log("getPublisher data:", getPublisher);
  }, [getPublisher]);

  return (
    <>
      <Loader loading={loading} />
      <Container className='py-3 h-100'>
        <h3 className='text-center py-2 text-black my-4 underline'><u>Publish Request</u></h3>
        <Card className='shadow mt-4'>
          <CardBody className='p-4'>
            <CustomTable
              columns={COLUMNS}
              data={getPublisher.data || []}
              noDataMessage={"No Data Available"}
            />
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default PublisherListing;
