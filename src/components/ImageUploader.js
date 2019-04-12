import React, { Component } from 'react';
// import IconTrash from 'react-icons/lib/fa/trash';
import { FaTimes as IconTrash } from 'react-icons/fa';
import { DraggableImage } from './';
import { FaRegEdit, FaAlignJustify } from 'react-icons/fa';
import { LoadingIndicator } from './';
class ImageUploader extends Component {
  render() {
    const {
      // no,
      imgIndex,
      onUpload,
      onDelete,
      onSwitch,
      url,
      uploading
    } = this.props;

    return (
      <div>
        <DraggableImage imgIndex={imgIndex} onSwitch={onSwitch}>
          {uploading ? (
            <p className="mt-2 mb-2">
              <LoadingIndicator text="Uploading" height="242px" />
            </p>
          ) : (
            <div>
              <form id="formImage">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <FaAlignJustify />
                  </div>
                  <div className="d-flex justify-content-end my-2 ">
                    {url && url !== '' && (
                      <label
                        htmlFor={`image_${imgIndex}`}
                        className="btn labelButton">
                        <FaRegEdit />
                      </label>
                    )}
                    <button
                      className="btn ml-2"
                      style={{ padding: '8px .5rem' }}
                      onClick={e => onDelete(e, imgIndex)}>
                      <IconTrash />
                    </button>
                  </div>
                </div>

                <input
                  type="file"
                  id={`image_${imgIndex}`}
                  style={{ display: 'none' }}
                  accept="image/*"
                  data-max-size="5000"
                  onChange={onUpload}
                />
              </form>
              {url && url !== '' ? (
                <div
                  className="d-flex"
                  style={{
                    height: '200px',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <img
                    className="img-fluid"
                    src={url}
                    alt="img"
                    style={{ height: 'auto', width: '100%' }}
                  />
                </div>
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: '200px' }}>
                  <label
                    htmlFor={`image_${imgIndex}`}
                    className="btn labelButton">
                    <FaRegEdit />
                  </label>
                </div>
              )}
            </div>
          )}
        </DraggableImage>
      </div>
    );
  }
}

export default ImageUploader;
