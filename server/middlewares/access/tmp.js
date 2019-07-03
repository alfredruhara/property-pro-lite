import { tmpSession } from '../../models/userModel';
import { UNAUTHORIZED_CODE } from '../../constantes/statusCodes';
import { UNAUTHENTIFICATED_MSG } from '../../constantes/customeMessages';

class Tmp {
  static session(req, res, next) {
    if (tmpSession.length < 1) {
      return res.status(UNAUTHORIZED_CODE).json({
        status: UNAUTHORIZED_CODE,
        message: UNAUTHENTIFICATED_MSG
      });
    }
    next();
    return true;
  }
}

export default Tmp;
