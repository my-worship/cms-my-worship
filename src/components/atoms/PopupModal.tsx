import React from "react";
import { Backdrop, Box, Button, Fade, IconButton, Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import { MainCard } from "./MainCard";
import { Col } from "./Col";
import { Row } from "./Row";
import { ColorType } from "../../utilities/type-utils";

export const PopupModal = (props: IProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.isOpen}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.isOpen}>
          <Box sx={style}>
            <MainCard
              className={`${props.widthFit ? "w-fit" : "min-w-[642px]"} pt-7`}
            >
              <Col style={{ width: "100%" }}>
                {props.hiddenCloseButton !== false ||
                  (props.hiddenCloseButton !== undefined && (
                    <Row justify={"end"}>
                      <IconButton component="label" onClick={props.onClose}>
                        <Close />
                      </IconButton>
                    </Row>
                  ))}

                {props.components || props.children}
                {!props.hiddenButton && (
                  <Row justify={"space-between"} className={"gap-3 mt-8"}>
                    {!props.singleButton && (
                      <Button
                        onClick={props.onCancel ?? props.onClose}
                        color={"inherit"}
                        classes={{ contained: "border w-full" }}
                        variant={"contained"}
                      >
                        Cancel
                      </Button>
                    )}

                    <Button
                      classes={{ contained: "border w-full" }}
                      variant={"contained"}
                      type={"submit"}
                      onClick={props.onSubmit}
                    >
                      Ok
                    </Button>
                  </Row>
                )}
              </Col>
            </MainCard>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
interface IProps {
  okLabel?: string;
  okButtonColor?: ColorType;
  cancelButtonColor?: ColorType;
  cancelLabel?: string;
  onClose?: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  hiddenButton?: boolean;
  components?: any;
  children?: any;
  hiddenCloseButton?: boolean;
  singleButton?: boolean;

  widthFit?: boolean;
  onSubmit?: () => void;
}
