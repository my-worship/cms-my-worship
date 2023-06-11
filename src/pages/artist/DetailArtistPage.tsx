import { HeaderLayouts } from "../../components/atoms/HeaderLayouts";
import React from "react";
import { IBreadCrumbList } from "../../utilities/type-utils";
import { StringRoutes } from "../../routes/string-routes";
import { Check, Close, Edit } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { Row } from "../../components/atoms/Row";
import { Col } from "../../components/atoms/Col";
import { MainCard } from "../../components/atoms/MainCard";
import { fakeImage } from "../../helper/fake-data-helper";
import { InlineColText } from "../../components/atoms/InlineColText";

export function DetailArtistPage() {
  const stringRoutes = new StringRoutes();
  const breadCrumbData: IBreadCrumbList[] = [
    { path: stringRoutes.root(), label: "Home" },
    { path: stringRoutes.artist(), label: "Artist" },
    { label: "Artist Name" },
  ];

  function rightContentHeader() {
    return (
      <Row itemsAlign={"center"} gap={"sm"}>
        <Tooltip arrow={true} title={"Reject"}>
          <Button color={"error"} variant={"outlined"}>
            <Close />
          </Button>
        </Tooltip>
        <Tooltip arrow={true} title={"Revise"}>
          <Button color={"info"} variant={"outlined"}>
            <Edit />
          </Button>
        </Tooltip>
        <Tooltip arrow={true} title={"Approve"}>
          <Button color={"success"} variant={"outlined"}>
            <Check />
          </Button>
        </Tooltip>
      </Row>
    );
  }

  const dummy = "<p>paragraf yang ada sekarang ini dia&nbsp;</p>";
  return (
    <Col gap={"lg"}>
      <HeaderLayouts
        rightContent={rightContentHeader()}
        breadcrumbData={breadCrumbData}
        title={"Artist Detail"}
      />
      <div className={"flex  justify-between gap-4"}>
        <MainCard className={"w-1/2"}>
          <h1>HELLO WORLD</h1>
          <div className={"content_html mt-3"}>
            <div dangerouslySetInnerHTML={{ __html: dummy }} />
          </div>
        </MainCard>
        <MainCard className={"w-1/2"}>
          <Row gap={"lg"}>
            <img alt={"name"} className={"w-1/2"} src={fakeImage()} />
            <Col gap={"lg"}>
              <InlineColText
                isBorderBottom
                label={"Request By"}
                value={"Rivo Pelu"}
              />
              <InlineColText
                isBorderBottom
                label={"Request Date"}
                value={"2023-6-11 - 11:23"}
              />
              <InlineColText label={"Request Notes"} value={dummy} />
            </Col>
          </Row>
        </MainCard>
      </div>
    </Col>
  );
}
