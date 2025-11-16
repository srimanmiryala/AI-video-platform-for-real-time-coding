
import React, { useRef, useEffect } from 'react';
import { MicOnIcon, VideoOnIcon } from './Icons';

interface VideoFeedProps {
  stream: MediaStream | null;
  username: string;
  isMuted?: boolean;
  isPlaceholder?: boolean;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ stream, username, isMuted = false, isPlaceholder = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video shadow-lg">
      {isPlaceholder ? (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
                <div className="w-16 h-16 rounded-full bg-gray-700 mx-auto flex items-center justify-center mb-2">
                    <p className="text-2xl font-bold">{username.charAt(0).toUpperCase()}</p>
                </div>
                <p>{username}</p>
                <p className="text-sm">Connecting...</p>
            </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium drop-shadow-md">{username}</p>
          {!isPlaceholder && (
            <div className="flex items-center space-x-2">
              <MicOnIcon className="w-4 h-4 text-green-400" />
              <VideoOnIcon className="w-4 h-4 text-green-400" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
