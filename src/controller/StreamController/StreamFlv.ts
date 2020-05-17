import { Request, Response } from "express";
import axios from "axios";
import { ENV } from "../../services/EnvironmentService";

export const getStreamFlv = (req: Request, res: Response) => {
  axios
    .get(
      ENV?.mediaServer +
        `/api/buffer/${req.params.streamerId}?token=${req.query.token}`
    )
    .then((publisher: any) => {
      //send FLV header
      let FLVHeader = Buffer.from([
        0x46,
        0x4c,
        0x56,
        0x01,
        0x00,
        0x00,
        0x00,
        0x00,
        0x09,
        0x00,
        0x00,
        0x00,
        0x00,
      ]);
      if (publisher.isFirstAudioReceived) {
        FLVHeader[4] |= 0b00000100;
      }

      if (publisher.isFirstVideoReceived) {
        FLVHeader[4] |= 0b00000001;
      }
      res.write(FLVHeader);

      //send Metadata
      if (publisher.metaData != null) {
        let packet = FlvPacket.create(publisher.metaData, 18);
        let tag = NodeFlvSession.createFlvTag(packet);
        res.write(tag);
      }

      //send aacSequenceHeader
      if (publisher.audioCodec == 10) {
        let packet = FlvPacket.create(publisher.aacSequenceHeader, 8);
        let tag = NodeFlvSession.createFlvTag(packet);
        res.write(tag);
      }

      //send avcSequenceHeader
      if (publisher.videoCodec == 7 || publisher.videoCodec == 12) {
        let packet = FlvPacket.create(publisher.avcSequenceHeader, 9);
        let tag = NodeFlvSession.createFlvTag(packet);
        res.write(tag);
      }
    });
};

const FlvPacket = {
  create: (payload = [], type = 0, time = 0) => {
    return {
      header: {
        length: payload.length,
        timestamp: time,
        type: type,
      },
      payload: payload,
    };
  },
};

class NodeFlvSession {
  static createFlvTag(packet: any) {
    let PreviousTagSize = 11 + packet.header.length;
    let tagBuffer = Buffer.alloc(PreviousTagSize + 4);
    tagBuffer[0] = packet.header.type;
    tagBuffer.writeUIntBE(packet.header.length, 1, 3);
    tagBuffer[4] = (packet.header.timestamp >> 16) & 0xff;
    tagBuffer[5] = (packet.header.timestamp >> 8) & 0xff;
    tagBuffer[6] = packet.header.timestamp & 0xff;
    tagBuffer[7] = (packet.header.timestamp >> 24) & 0xff;
    tagBuffer.writeUIntBE(0, 8, 3);
    tagBuffer.writeUInt32BE(PreviousTagSize, PreviousTagSize);
    packet.payload.copy(tagBuffer, 11, 0, packet.header.length);
    return tagBuffer;
  }
}
