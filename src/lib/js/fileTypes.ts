import fileIcon from '~/assets/icons/file.svg'
import audioIcon from '~/assets/icons/audiofile.svg'
import exeIcon from '~/assets/icons/exefile.svg'
import msiIcon from '~/assets/icons/msifile.svg'
import isoIcon from '~/assets/icons/isofile.svg'
import zipIcon from '~/assets/icons/zipfile.svg'
import rarIcon from '~/assets/icons/rarfile.svg'
import txtIcon from '~/assets/icons/txtfile.svg'
import jpgIcon from '~/assets/icons/jpgfile.svg'
import pngIcon from '~/assets/icons/pngfile.svg'

export const extIcons: Record<string, string> = {
  default: fileIcon,

  mp3: audioIcon,
  wav: audioIcon,
  ogg: audioIcon,
  m4a: audioIcon,
  weba: audioIcon,
  aac: audioIcon,
  flac: audioIcon,
  exe: exeIcon,
  com: exeIcon,
  msi: msiIcon,
  iso: isoIcon,
  zip: zipIcon,
  rar: rarIcon,
  '7z': zipIcon,
  gz: zipIcon,
  xz: zipIcon,
  txt: txtIcon,
  jpg: jpgIcon,
  jpeg: jpgIcon,
  png: pngIcon,
}
