def getEllipsoidBoundary( self
                        , covMat
                        , meanVec
                        , npoint = 50
                        ):
    """
    
    Return the coordinates of the boundary of an 
    ellipsoid represented by the input ``covMat``
    covariance matrix and the ``meanVec`` center.

        **Parameters**

            covMat

                The representative covariance matrix 
                of the ellipsoid.

            meanVec

                A vector representing the center 
                of the ellipsoid.

            npoint

                The number of points with which the 
                ellipsoid is represented. The more,
                the higher the resolution will be.
                The default value is 50.

        **Returns**

            A matrix of size ``(2, npoint)`` that contains 
            the boundary points of the generated ellipsoid 
            corresponding to the input matrix. 

    """

    from scipy import linalg as la

    independentVariable = np.linspace(0, 2*np.pi, npoint, endpoint = True)
    ap = np.zeros( (2, npoint) )
    ap[0,:] = np.cos(independentVariable)
    ap[1,:] = np.sin(independentVariable)
    eigenValues, eigenVecMat = la.eig(covMat)
    eigenValMat = np.eye(2)
    eigenValMat[0,0] = np.sqrt(eigenValues[0].real)
    eigenValMat[1,1] = np.sqrt(eigenValues[1].real)
    meanVecRepMat = np.ones( (2,npoint) )
    meanVecRepMat[0,:] = meanVec[0]
    meanVecRepMat[1,:] = meanVec[1]
    return np.matmul( np.matmul(eigenVecMat.real , eigenValMat) , ap ) + meanVecRepMat 
