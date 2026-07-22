import struct

def get_mp4_duration(file_path):
    try:
        with open(file_path, 'rb') as f:
            while True:
                header = f.read(8)
                if len(header) < 8:
                    break
                size, box_type = struct.unpack('>I4s', header)
                if box_type == b'moov':
                    # Search inside moov box
                    moov_data = f.read(size - 8)
                    idx = moov_data.find(b'mvhd')
                    if idx != -1:
                        # mvhd box starts at idx
                        # mvhd structure:
                        # 4 bytes size, 4 bytes type ('mvhd'), 1 byte version, 3 bytes flags
                        # version 0:
                        #   4 bytes creation time
                        #   4 bytes modification time
                        #   4 bytes time scale
                        #   4 bytes duration
                        # version 1:
                        #   8 bytes creation time
                        #   8 bytes modification time
                        #   4 bytes time scale
                        #   8 bytes duration
                        version = moov_data[idx + 8]
                        if version == 0:
                            timescale_idx = idx + 12 + 8
                            timescale = struct.unpack('>I', moov_data[timescale_idx : timescale_idx + 4])[0]
                            duration = struct.unpack('>I', moov_data[timescale_idx + 4 : timescale_idx + 8])[0]
                        else:
                            timescale_idx = idx + 12 + 16
                            timescale = struct.unpack('>I', moov_data[timescale_idx : timescale_idx + 4])[0]
                            duration = struct.unpack('>Q', moov_data[timescale_idx + 4 : timescale_idx + 12])[0]
                        return duration / timescale
                    break
                else:
                    f.seek(size - 8, 1)
    except Exception as e:
        print(f"Error: {e}")
    return None

duration = get_mp4_duration("d:/aerth/public/uploads/Animate_the_provided_AERTH_log_gwr_video_mvp.mp4")
print(f"Duration: {duration} seconds")
