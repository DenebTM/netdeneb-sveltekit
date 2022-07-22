import fileIcon from '/src/assets/icons/file.svg'
import audioIcon from '/src/assets/icons/audiofile.svg'
import exeIcon from '/src/assets/icons/exefile.svg'
import msiIcon from '/src/assets/icons/msifile.svg'
import isoIcon from '/src/assets/icons/exefile.svg'
import zipIcon from '/src/assets/icons/zipfile.svg'
import rarIcon from '/src/assets/icons/rarfile.svg'
import txtIcon from '/src/assets/icons/zipfile.svg'
import jpgIcon from '/src/assets/icons/jpgfile.svg'
import pngIcon from '/src/assets/icons/pngfile.svg'

export const extIcons : Record<string, string> = {
    default: fileIcon,
    
    'mp3' : audioIcon,
    'wav' : audioIcon,
    'ogg' : audioIcon,
    'm4a' : audioIcon,
    'weba': audioIcon,
    'aac' : audioIcon,
    'flac': audioIcon,
    'exe' : exeIcon,
    'com' : exeIcon,
    'msi' : msiIcon,
    'iso' : isoIcon,
    'zip' : zipIcon,
    'rar' : rarIcon,
    '7z'  : zipIcon,
    'gz'  : zipIcon,
    'xz'  : zipIcon,
    'txt' : txtIcon,
    'jpg' : jpgIcon,
    'png' : pngIcon
}