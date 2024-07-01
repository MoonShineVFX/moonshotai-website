import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { promptPresets, models } from "./promptPresets";
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Checkbox,
} from "@material-tailwind/react";
import { upperCase } from "lodash";

export const ModelSelector = ({ data, onModelChange, selectedCookie }) => {
  const [currentModel, setCurrentModel] = useState(data[0]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleModelClick = (model) => {
    setCurrentModel(model);
    handleOpen(); // 设置当前模型后关闭模态框
    onModelChange(model);
  };
  useEffect(() => {
    if (selectedCookie.length > 0) {
      var result = data.find((item) => {
        return item.command === upperCase(selectedCookie);
      });
      setCurrentModel(result);
    }
  }, [selectedCookie]);
  return (
    <>
      <div className="w-full " onClick={handleOpen}>
        <div className={`relative  text-sm border-gray-600 break-keep  my-2`}>
          模型{" "}
        </div>
        <div className="bg-white/20  border border-white/40 text-white  font-bold rounded-md flex items-center h-16 overflow-hidden relative">
          <div className="w-1/2 overflow-hidden">
            <img
              src={currentModel.image + "?width=300"}
              alt=""
              className=" object-cover object-center "
            />
          </div>
          <div className="flex justify-center items-center w-full text-base">
            {currentModel.title}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { y: 0 },
          unmount: { y: -100 },
        }}
        className="bg-gray-900"
      >
        <DialogHeader className="p-2 justify-between">
          <Typography variant="h5" color="white">
            選擇模型指令
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <div>
              <FaXmark />
            </div>
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <div className="  space-y-4">
            {data.map((model) => (
              <div
                key={model.command}
                onClick={() => handleModelClick(model)}
                className="bg-white/10  border border-white/30 text-white  font-bold rounded-md flex items-center h-14 overflow-hidden relative"
              >
                <div className="w-full aspect-square overflow-hidden opacity-60">
                  <img
                    src={model.image + "?width=300"}
                    alt={model.title}
                    className=" object-cover object-center "
                  />
                </div>
                <div className=" absolute  flex justify-center items-center w-full text-base">
                  {model.title}
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>關閉</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const StyleSelector = ({ data, onStyleChange, selectedCookie }) => {
  const [currentStyle, setCurrentStyle] = useState(data[25]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  // const handleModelClick = (item) => {
  //   setCurrentStyle(item);
  //   handleOpen(); // 设置当前模型后关闭模态框
  //   onStyleChange(item)
  // };
  const handleStyleChange = (style) => {
    // 处理复选框的更改
    setSelectedStyles((prevStyles) => {
      if (prevStyles.includes(style.label)) {
        return prevStyles.filter((item) => item !== style.label);
      } else {
        return [...prevStyles, style.label];
      }
    });
  };
  const handleSubmit = () => {
    // 当提交按钮被点击时，将所选的样式作为数组传递给回调函数
    onStyleChange(selectedStyles);
    handleOpen();
  };

  useEffect(() => {
    if (selectedCookie.length > 0) {
      setSelectedStyles(selectedCookie);
    }
  }, [selectedCookie]);
  return (
    <>
      <div className="w-full " onClick={handleOpen}>
        <div className={`relative  text-sm border-gray-600 break-keep  my-2`}>
          風格{" "}
        </div>
        <div className="border border-white/40 text-white text-base font-semibold rounded-md overflow-hidden  relative h-16 flex justify-center items-center">
          <img
            src={`https://r2.wevb.moonshine.tw/msweb/moonshotai/presets/${currentStyle.id}.jpg`}
            alt=""
            className=" absolute  object-cover object-center opacity-60 -z-10"
          />
          選擇風格({selectedStyles.length})
        </div>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { y: 0 },
          unmount: { y: -100 },
        }}
        className="bg-gray-900"
      >
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="white">
            選擇風格
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <div>
              <FaXmark />
            </div>
          </IconButton>
        </DialogHeader>
        <DialogBody className="p-2 ">
          <div className="grid grid-cols-3  gap-3 relative  overflow-y-auto h-[50vh] pr-4">
            {data.map((item) => {
              if (item.label === "無") return;
              return (
                <div
                  key={item.id}
                  onClick={() => handleStyleChange(item)}
                  className="border h-16 border-white/40 text-white text-xl font-bold rounded-md overflow-hidden  relative flex justify-center items-cente"
                >
                  <img
                    src={`https://r2.wevb.moonshine.tw/msweb/moonshotai/presets/${item.id}.jpg`}
                    alt={item.label}
                    className=" absolute top-0  object-cover object-center opacity-60 z-0 "
                  />
                  <div className="flex justify-center items-center w-full text-base z-10 text-center">
                    {item.label}
                  </div>
                  <div className=" absolute top-0 right-0">
                    <Checkbox
                      checked={selectedStyles.includes(item.label)}
                      containerProps={{ className: " p-1 " }}
                      className="rounded-full"
                      color="blue"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 text-white"
          >
            <span>關閉</span>
          </Button>
          <Button
            variant="gradient"
            color="black"
            onClick={handleSubmit}
            className="mr-1"
          >
            <span>確定風格({selectedStyles.length})</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
