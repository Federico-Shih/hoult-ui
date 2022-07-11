import { useCallback, useState } from 'react';
import { IpAddress } from '../../../../api/ip';
import { UpdateListingMutation, UpdateType } from '../../../../api/ip/services.types';

interface IProps {
  ip: IpAddress;
  editIpAddress: UpdateListingMutation;
}

const useIpForm = ({ ip, editIpAddress }: IProps) => {
  const [tempDesc, setDesc] = useState<string>(ip.description || '');
  const [tempAdd, setTempAdd] = useState<string>(
    ip.additional ? JSON.stringify(ip.additional, null, 2) : ''
  );

  const [editing, setEditing] = useState(false);
  const [invalidJsonErr, setInvalidJson] = useState(false);

  const startEdition = useCallback(() => {
    setEditing(true);
  }, [ip]);

  const cancelEdition = useCallback(() => {
    setEditing(false);
    setDesc(ip.description || '');
    setTempAdd(ip.additional ? JSON.stringify(ip.additional, null, 2) : '');
  }, [ip]);

  const saveEdition = useCallback(async () => {
    const newIpAddress: UpdateType = {};
    let save = true;
    newIpAddress.description = tempDesc.trim();

    if (tempAdd.trim() !== (ip.additional ? JSON.stringify(ip.additional, null, 2) : '')) {
      try {
        if (tempAdd.trim() !== '') {
          newIpAddress.additional = JSON.parse(tempAdd);
        }
      } catch (e) {
        setInvalidJson(true);
        save = false;
      }
    }
    if (save) {
      const res = await editIpAddress({ ip: ip.ip, update: newIpAddress });
      if (res) {
        ip.description = res.description;
        ip.additional = res.additional;
        setDesc(ip.description || '');
        setTempAdd(ip.additional ? JSON.stringify(ip.additional, null, 2) : '');
      }
      setEditing(false);
    }
  }, [tempDesc, tempAdd, editing, editIpAddress]);

  return {
    state: { tempDesc, tempAdd, editing, invalidJsonErr },
    actions: { startEdition, cancelEdition, setTempAdd, setDesc, saveEdition },
  };
};

export default useIpForm;
