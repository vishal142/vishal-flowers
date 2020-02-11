<?php

/**
 * Ultra Thumbnail Creator PRO
 * 
 * @author      SourceAssassins <sourceassassins@gmail.com>
 * @version     3.2
 * @date        September 7, 2017
 * @url		https://codecanyon.net/item/image-resizer-and-thumbnail-creator-watermark/15902800
 */
class utcPro {

    public
	    $filesPath			 = {{asset('uploads/item_image/')}},
	    $cachePath			 = 'cache/',
	    $cacheEnabled			 = 1,
	    $quality				 = 100,
	    $forceWatermark			 = 0,
	    $forceBlackAndWhite		 = 0,
	    $watermarkPatternFile		 = 'images/watermark/logo-pattern.png',
	    $watermarkPatternMinWidth	 = 0,
	    $watermarkPatternMinHeight	 = 0,
	    $watermarkFile			 = 'images/watermark/logo.png',
	    $watermarkOffset			 = 5,
	    $watermarkRelativeSize		 = 0.6,
	    $watermarkMinWidth		 = 0,
	    $watermarkMinHeight		 = 0,
	    $watermarkPosition		 = 'bl',
	    $watermarkBlackAndWhite		 = 0,
	    $noImage				 = 'images/default/no-image.png',
	    $defaultMode			 = 'ci',
	    $allowSubFolders			 = 1,
	    $checkOrientation		 = 1,
	    /* do not change below this line */
	    $casheCustomPath			 = '',
	    $blackAndWhite			 = 0,
	    $watermark			 = 0,
	    $sourceFile,
	    $saveFile,
	    $image,
	    $width,
	    $height,
	    $sourceWidth,
	    $sourceHeight,
	    $imgType,
	    $new,
	    $nameMaxLength			 = 255,
	    $modes				 = array(
		'ci'	 => 'createImage',
		'cm'	 => 'createMini',
		'cl'	 => 'createLogo',
		'cbw'	 => 'createImageByWidth',
		'cbh'	 => 'createImageByHeight',
		    ),
	    $watermarkPositions		 = array(
		'tl',
		'tr',
		'bl',
		'br',
		'cc',
		'tc',
		'bc',
		'cl',
		'cr',
		'pattern'
		    ),
	    $exif				 = array()

    ;

    function prepareSource() {
	$CreateFuntion	 = 'imagecreatefrom' . $this->imgType;
	$this->source	 = $CreateFuntion($this->sourceFile);
	$this->adjustOrientation();
	$this->sourceX	 = imagesx($this->source);
	$this->sourceY	 = imagesy($this->source);
    }

    function adjustOrientation() {
	if ($this->checkOrientation == 1) {
	    $this->exif = $this->getExifData();
	    if (isset($this->exif['Orientation'])) {
		switch ($this->exif['Orientation']) {
		    case 3:
			$this->source	 = imagerotate($this->source, 180, 0);
			break;
		    case 6:
			$this->source	 = imagerotate($this->source, -90, 0);
			break;
		    case 8:
			$this->source	 = imagerotate($this->source, 90, 0);
			break;
		}
	    }
	}
    }

    function getExifData() {
	$output = exif_read_data($this->sourceFile);
	return $output;
    }

    function getBasename($fileName) {
	$name	 = basename($fileName);
	$parts	 = array_reverse(explode('.', $name));
	$ext	 = $parts[0];
	unset($parts[0]);
	$prefix	 = $this->width . 'x' . $this->height . '_' . $this->mode . '_' . $this->watermark . '_' . $this->watermarkPosition . '_' . $this->blackAndWhite . '_';
	$hash	 = '_' . sha1($prefix . $name);
	$newName = $prefix . substr(join('.', array_reverse($parts)), 0, ($this->nameMaxLength - (strlen($hash . $prefix . $ext) + 1))) . $hash . '.' . $ext;
	return $newName;
    }

    function saveImage() {
	$saveFunction = 'image' . $this->imgType;
	if ($saveFunction == 'imagejpeg') {
	    $src = $saveFunction($this->new, $this->saveFile, $this->quality);
	} else {
	    $src = $saveFunction($this->new, $this->saveFile);
	}
	imagedestroy($this->new);
    }

    function setHeaders() {
	if (!function_exists('apache_request_headers')) {
	    $headers = $this->apache_request_headers_custom();
	} else {
	    $headers = apache_request_headers();
	}

	$lastModified = filemtime($this->saveFile);

	header("Pragma: public");
	header("Content-type: image/" . $this->imgType);
	if (isset($headers['If-Modified-Since']) && (strtotime($headers['If-Modified-Since']) == $lastModified)) {
	    header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $lastModified) . ' GMT', true, 304);
	} else {
	    header('Content-Disposition: inline; filename="' . $this->imageFile . '"');
	    if ($this->cacheEnabled == 1) {
		header("Cache-Control: max-age=2592000");
		header("Expires: " . gmdate('D, d M Y H:i:s', (time() + 2592000)));
	    }
	    header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $lastModified) . ' GMT', true, 200);
	    readfile($this->saveFile);
	}
    }

    function setImageProperies($width, $height) {
	$this->new = imagecreatetruecolor($width, $height);
	imagealphablending($this->new, false);
	if ($this->imgType == 'jpeg') {
	    $color = imagecolorallocate($this->new, 0xFF, 0xFF, 0xFF);
	} else {
	    $color = imagecolorallocatealpha($this->new, 0xFF, 0xFF, 0xFF, 127);
	}
	imagefill($this->new, 0, 0, $color);
	imagesavealpha($this->new, true);

	if (function_exists('imageantialias')) {
	    imageantialias($this->new, true);
	}
    }

    function imageCreateFromFile() {
	$mime = strtolower($this->image['mime']);
	if ($mime === 'image/gif') {
	    $this->imgType = 'gif';
	} elseif ($mime === 'image/png' || $mime === 'image/x-png') {
	    $this->imgType = 'png';
	} else {
	    $this->imgType = 'jpeg';
	}
    }

    function addWatermark() {
	if ($this->watermark == 1) {
	    $imageX	 = imagesx($this->new);
	    $imageY	 = imagesy($this->new);

	    if ($this->watermarkPosition == 'pattern') {
		$this->watermarkFile = $this->watermarkPatternFile;
	    }

	    $wm		 = getimagesize($this->watermarkFile);
	    $watermarkX	 = $wm[0];
	    $watermarkY	 = $wm[1];

	    $wmSource = imagecreatefrompng($this->watermarkFile);
	    imagealphablending($wmSource, true);
	    imagealphablending($this->new, true);
	    if ($this->watermarkBlackAndWhite == 1) {
		imagefilter($wmSource, IMG_FILTER_GRAYSCALE);
	    }

	    if ($this->watermarkPosition != 'pattern' && ($imageX >= $this->watermarkMinWidth || $imageY >= $this->watermarkMinHeight)) {
		$newWatermarkX	 = floor($imageX * $this->watermarkRelativeSize);
		$newWatermarkY	 = floor($newWatermarkX * $watermarkY / $watermarkX);
		if (($newWatermarkY / $imageY) > $this->watermarkRelativeSize) {
		    $newWatermarkY	 = floor($imageY * $this->watermarkRelativeSize);
		    $newWatermarkX	 = floor($newWatermarkY * $watermarkX / $watermarkY);
		}
		switch ($this->watermarkPosition) {
		    case 'tl':
			$offsetX = $this->watermarkOffset;
			$offsetY = $this->watermarkOffset;
			break;
		    case 'tr':
			$offsetX = $imageX - ($newWatermarkX + $this->watermarkOffset);
			$offsetY = $this->watermarkOffset;
			break;
		    case 'bl':
			$offsetX = $this->watermarkOffset;
			$offsetY = $imageY - ($newWatermarkY + $this->watermarkOffset);
			break;
		    case 'br':
			$offsetX = $imageX - ($newWatermarkX + $this->watermarkOffset);
			$offsetY = $imageY - ($newWatermarkY + $this->watermarkOffset);
			break;
		    case 'cc':
			$offsetX = floor(($imageX - $newWatermarkX) / 2);
			$offsetY = floor(($imageY - $newWatermarkY) / 2);
			break;
		    case 'tc':
			$offsetX = floor(($imageX - $newWatermarkX) / 2);
			$offsetY = $this->watermarkOffset;
			break;
		    case 'bc':
			$offsetX = floor(($imageX - $newWatermarkX) / 2);
			$offsetY = floor(($imageY - $newWatermarkY) - $this->watermarkOffset);
			break;
		    case 'cl':
			$offsetX = $this->watermarkOffset;
			$offsetY = floor(($imageY - $newWatermarkY) / 2);
			break;
		    case 'cr':
			$offsetX = floor(($imageX - $newWatermarkX) - $this->watermarkOffset);
			$offsetY = floor(($imageY - $newWatermarkY) / 2);
			break;
		}
		imagecopyresampled($this->new, $wmSource, $offsetX, $offsetY, 0, 0, $newWatermarkX, $newWatermarkY, $watermarkX, $watermarkY);
	    } elseif ($imageX >= $this->watermarkPatternMinWidth || $imageY >= $this->watermarkPatternMinHeight) {
		$wmCols	 = ceil($imageX / $watermarkX);
		$wmRows	 = ceil($imageY / $watermarkY);

		for ($row = 0; $row <= $wmRows; $row++) {
		    for ($col = 0; $col <= $wmCols; $col++) {
			$offsetX = ($watermarkX * $col);
			$offsetY = ($watermarkY * $row);
			imagecopyresampled($this->new, $wmSource, $offsetX, $offsetY, 0, 0, $watermarkX, $watermarkY, $watermarkX, $watermarkY);
		    }
		}
	    }
	}
    }

    function makeBlackAndWhite() {
	if ($this->blackAndWhite == 1 || $this->forceBlackAndWhite == 1) {
	    imagefilter($this->new, IMG_FILTER_GRAYSCALE);
	}
    }

    function createImage() {
	$ratioX	 = $this->width / $this->sourceX;
	$ratioY	 = $this->height / $this->sourceY;

	if ($ratioX < $ratioY) {
	    $ratio	 = $ratioX;
	    $newX	 = $this->width;
	    $newY	 = floor($this->sourceY * $ratio);
	} else {
	    $ratio	 = $ratioY;
	    $newX	 = floor($this->sourceX * $ratio);
	    $newY	 = $this->height;
	}

	$this->setImageProperies($newX, $newY);
	imagecopyresampled($this->new, $this->source, 0, 0, 0, 0, $newX, $newY, $this->sourceX, $this->sourceY);
    }

    function createLogo() {
	if ($this->sourceX < $this->width && $this->sourceY < $this->height) {
	    $A	 = $this->sourceX;
	    $B	 = $this->sourceY;
	    $Xc	 = floor(($this->width - $A) / 2);
	    $Yc	 = floor(($this->height - $B) / 2);
	} else {
	    $A	 = $this->width;
	    $B	 = floor($this->sourceY * $this->width / $this->sourceX);
	    $Xc	 = 0;
	    $Yc	 = floor(($this->height - $B) / 2);
	}
	if ($B > $this->height) {
	    $A	 = floor($this->sourceX * $this->height / $this->sourceY);
	    $B	 = $this->height;
	    $Xc	 = floor(($this->width - $A) / 2);
	    $Yc	 = 0;
	}
	$this->setImageProperies($this->width, $this->height);
	imagecopyresampled($this->new, $this->source, $Xc, $Yc, 0, 0, $A, $B, $this->sourceX, $this->sourceY);
    }

    function createMini() {
	$ratio	 = $this->width / $this->height;
	$H	 = $this->sourceY;
	$y1	 = 0;
	$W	 = floor($H * $ratio);
	$x1	 = floor(($this->sourceX - $W) / 2);
	if ($W > $this->sourceX) {
	    $W	 = $this->sourceX;
	    $x1	 = 0;
	    $H	 = floor($W / $ratio);
	    $y1	 = floor(($this->sourceY - $H) / 2);
	}

	$this->setImageProperies($this->width, $this->height);
	imagecopyresampled($this->new, $this->source, 0, 0, $x1, $y1, $this->width, $this->height, $W, $H);
    }

    function createImageByWidth() {
	$ratio	 = $this->width / $this->sourceX;
	$newX	 = $this->width;
	$newY	 = floor($this->sourceY * $ratio);
	$this->setImageProperies($newX, $newY);
	imagecopyresampled($this->new, $this->source, 0, 0, 0, 0, $newX, $newY, $this->sourceX, $this->sourceY);
    }

    function createImageByHeight() {
	$ratio	 = $this->height / $this->sourceY;
	$newX	 = floor($this->sourceX * $ratio);
	$newY	 = $this->height;
	$this->setImageProperies($newX, $newY);
	imagecopyresampled($this->new, $this->source, 0, 0, 0, 0, $newX, $newY, $this->sourceX, $this->sourceY);
    }

    function __construct($image = null, $mode = null, $width = 0, $height = 0, $blackAndWhite = 0, $watermark = 0, $watermarkPosition = null) {
	if ($mode == null) {
	    $mode = $this->defaultMode;
	}
	if ($this->allowSubFolders == 1) {
	    $this->imageFile = $image;
	} else {
	    $this->imageFile = basename($image);
	}
	$this->mode		 = $mode;
	$this->width		 = $width;
	$this->height		 = $height;
	$this->blackAndWhite	 = $blackAndWhite;
	$this->watermark	 = $watermark;
	if ($watermarkPosition != null && in_array($watermarkPosition, $this->watermarkPositions)) {
	    $this->watermarkPosition = $watermarkPosition;
	}
	if ($this->forceWatermark == 1) {
	    $this->watermark = 1;
	}

	if ($this->watermark != 1) {
	    $this->watermark = 0;
	}
	if ($this->blackAndWhite != 1) {
	    $this->blackAndWhite = 0;
	}

	if (array_key_exists($this->mode, $this->modes)) {
	    $this->sourceFile = $this->filesPath . $this->imageFile;
	    if (!file_exists($this->sourceFile) || !is_file($this->sourceFile)) {
		$this->sourceFile = $this->noImage;
	    } else {
		header("HTTP/1.0 404 Not Found");
	    }
	    $this->casheCustomPath	 = $this->findCustomPath($this->imageFile);
	    $this->saveFile		 = $this->cachePath . $this->casheCustomPath . $this->getBasename($this->imageFile);

	    $this->image = getimagesize($this->sourceFile);
	    $this->ImageCreateFromFile($this->image);
	    if ($this->cacheEnabled == 0 || !file_exists($this->saveFile)) {
		$this->prepareSource();
		$this->{$this->modes[$this->mode]}();
		$this->makeBlackAndWhite();
		$this->addWatermark();
		$this->saveImage();
	    }
	    $this->setHeaders();
	} else {
	    header("HTTP/1.0 404 Not Found");
	}
	exit;
    }

    function findCustomPath($filePath) {
	$pathData	 = pathinfo($filePath);
	$firstChar	 = $this->getFirstCharStandard($pathData['basename']);

	$currentFolder = $pathData['dirname'] . '/' . $firstChar . '/';

	@mkdir($this->cachePath . $currentFolder, 0777, true);
	@chmod($this->cachePath . $currentFolder, 0777);

	return $currentFolder;
    }

    function getFirstCharStandard($fileName) {
	return strtolower(substr(preg_replace('~[^a-zA-Z0-9]+~', '', $fileName), 0, 1));
    }

    /* in case PHP is not installed as an Apache module. */

    function apache_request_headers_custom() {
	$arh	 = array();
	$rx_http = '/\AHTTP_/';
	foreach ($_SERVER as $key => $val) {
	    if (preg_match($rx_http, $key)) {
		$arh_key	 = preg_replace($rx_http, '', $key);
		$rx_matches	 = array();
		$rx_matches	 = explode('_', $arh_key);
		if (count($rx_matches) > 0 and strlen($arh_key) > 2) {
		    foreach ($rx_matches as $ak_key => $ak_val)
			$rx_matches[$ak_key]	 = ucfirst($ak_val);
		    $arh_key		 = implode('-', $rx_matches);
		}
		$arh[$arh_key] = $val;
	    }
	}
	return( $arh );
    }

}
