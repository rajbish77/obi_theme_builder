import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Container } from "react-bootstrap";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../CommonComponent/Table";
import Loader from "../../../Loader";
import { PREVIEW_URL, VIPER_CONST } from "../../../commonConstant";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { publish } from "../../../slices/publisher/publisherSlice";
import { showConfirm, showError, showReject, showSuccess } from "../../Swal";
import { HandleAPIError } from "../../../commonFunction";
import { publishButton } from "../../../slices/publisher/buttonFunctionSlice";
import { rejectButton } from "../../../slices/publisher/buttonFunctionRej";

function PublisherListing(): JSX.Element {
  const dispatch = useAppDispatch();
  const getPublisher = useAppSelector((state) => state.publish.publisher);
  const [tmp, setTmp] = useState(0);
  const [loading, setLoading] = useState(false);
  const useData = useAppSelector((state) => state.buttonWork);
  const useDataRej = useAppSelector((state) => state.rejuctButton);
  const loadingRej = useAppSelector((state) => state.rejuctButton.loading);
  const loadingPublish = useAppSelector((state) => state.buttonWork.loading);

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
            size="sm"
            className="custom-class"
          >
            Preview
          </Button>
          <Button
            onClick={() => handlePublishButtonClick(info.row.original)}
            size="sm"
            className="custom-class btn-success"
          >
            Publish
          </Button>
          <Button
            onClick={() => handleRejectButtonClick(info.row.original)}
            size="sm"
            className="custom-class btn-danger"
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
    let confirmed = await showConfirm(
      "Confirm",
      "Are you sure you want to publish the theme?"
    );
    if (confirmed.isConfirmed) {
      try {
        const request: { affiliateid: any; action: string } = {
          affiliateid: row?.affiliateid,
          action: "P",
        };

        const response = await dispatch(publishButton(request)).unwrap();
        console.log('Response from publishButton:', response);

        if (response?.status === 0) {
          showSuccess("Success", "Theme published successfully");
        } else {
          showError("Error", useDataRej?.statusMessage);
        }
      } catch (error) {
        HandleAPIError(error);
      }
    }
  };

  useEffect(() => {
    if (useData?.status === 0) {
      console.log(useData);
      showSuccess("Success", "Theme published successfully");
    } else {
      showError("Error", useData?.statusMessage);
    }
  }, [useData]);

  const handleRejectButtonClick = async (row: any) => {
    let confirmed = await showReject(
      "Remarks",
      row?.entryby,
      row.distributorname
    );

    if (confirmed.isConfirmed) {
      try {
        const requestReject: { affiliateid: any, action: string, message: any } = {
          affiliateid: row?.affiliateid,
          action: "R",
          message: confirmed?.value,
        };

        const response = await dispatch(rejectButton(requestReject)).unwrap();
        console.log('Response from rejectButton:', response);
        if (response?.status === 0) {
          showSuccess("Success", "Publish request rejected!");
        } else {
          showError("Error", useDataRej?.statusMessage);
        }
      } catch (error) {
        HandleAPIError(error);
      }
    }
  };

  useEffect(() => {
    if (useDataRej?.status === 0) {
      console.log(useDataRej);
      showSuccess("Success", "Publish request rejected!");
    } else {
      showError("Error", useDataRej?.statusMessage);
    }
  }, [useDataRej]);

  useEffect(() => {
    dispatch(publish());
  }, [dispatch, tmp]);

  return (
    <>
      <Loader loading={loadingRej} />
      <Loader loading={loadingPublish} />
      <Container className="py-3 h-100">
        <h3 className="text-center py-2 text-black my-4 underline">
          <u>Publish Request</u>
        </h3>
        <Card className="shadow mt-4">
          <CardBody className="p-4">
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
