import express from 'express';
import { 
    getAllCandidates, 
    createCandidate, 
    getCandidateById, 
    updateCandidate, 
    deleteCandidate 
} from '../controllers/candidateController.js';
import { candidateValidationRules, handleValidationErrors } from '../middleware/validator.js';

const router = express.Router();

// Apply validation to POST and PUT routes
router.post('/', candidateValidationRules, handleValidationErrors, createCandidate);
router.put('/:id', candidateValidationRules, handleValidationErrors, updateCandidate);

// Standard routes
router.get('/', getAllCandidates);
router.get('/:id', getCandidateById);
router.delete('/:id', deleteCandidate);

export default router;